const { Users } = require("../../models");
const {generateToken, hashPassword, comparePasswords } = require('../../utils/authUtils');

const resolvers = {
  Query: {
    currentUser: Users,
    users: async (_, __) => {
      try {
        return await Users.findAll();
      } catch (error) {
        throw new Error("Failed to fetch users");
      }
    },
    user: async (_, { user_id }) => {
      try {
        return await Users.findByPk(user_id);
      } catch (error) {
        throw new Error("Failed to fetch user");
      }
    },
  },

  Mutation: {
    login: async (_, { username, password }) => {
      const user = await Users.findOne({ where: { username } });
      if (!user) {
        throw new Error("User not found");
      }

      const isPasswordValid = await comparePasswords(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      const token = await generateToken(user);
      return { token, user };
    },
    addUser: async (_, args) => {
      try {
        const { password } = args;
        const hashedPassword = await hashPassword(password);
        const user = await Users.create({
          ...args,
          password: hashedPassword,
        });

        return user;
      } catch (error) {
        throw new Error("Failed to create user");
      }
    },

    updateUser: async (_, { user_id, ...updateFields }) => {
      try {
        const [updated] = await Users.update(updateFields, {
          where: { user_id },
          returning: true, // To get the updated instance
        });

        if (updated) {
          const updatedUser = await Users.findByPk(user_id);
          return updatedUser;
        } else {
          throw new Error("User not found");
        }
      } catch (error) {
        throw new Error("Failed to update user");
      }
    },

    deleteUser: async (_, { user_id }) => {
      try {
        const user = await Users.findByPk(user_id);

        if (user) {
          await user.destroy();
          return `User with id ${user_id} deleted successfully`;
        } else {
          throw new Error("User not found");
        }
      } catch (error) {
        throw new Error("Failed to delete user");
      }
    },
  },
};

module.exports = { resolvers };
