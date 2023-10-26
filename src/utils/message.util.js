class MessageUtil {
  static USER = {
    USER_ALREADY_EXISTS: "User already exists",
    USER_UPDATE_SUCCESSFUL: 'User updated successfully.',
    USER_NOT_FOUND: 'Unauthorized. User not found.',
    INVALID_ROLE: 'Invalid role. Must be "admin" or "user".',
    REGISTER_SUCCESSFUL: 'Register successful.',
    PERMISSION_DENIED_NON_ADMIN_USER: "Permission denied. Only admins can access this resource.",
    PERMISSION_DENIED_NON_SAME_USER: "Permission denied. You can only access your own user information.",
    RESET_PASSWORD_EMAIL_SENT: "Reset password email sent.",
    INVALID_RESET_TOKEN: "Invalid reset token.",
    PASSWORD_RESET_SUCCESSFUL: "Password reset successful.",
    USER_DELETE_SUCCESSFUL: "User deleted successfully.",
  }

  static INVALID_OBJECT_ID = "Invalid ObjectId"
  static INVALID_EMAIL = "Invalid email"
  static INVALID_PASSWORD = "Invalid password"
  static TOKEN_EXPIRED = "Unauthorized. Token Expired"
  static TOKEN_INVALID = "Unauthorized. Invalid token."
  static TOKEN_NOT_PROVIDED = "Unauthorized. Token not provided."
  
  static INTERNAL_SERVER_ERROR = "Internal server error."
}

module.exports = MessageUtil;