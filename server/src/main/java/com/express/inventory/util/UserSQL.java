package com.express.inventory.util;

/**
 * UserSQL
 *
 * This class contains all SQL statements required for
 * User management in the Express Inventory System.
 *
 * Covers:
 * - Table creation
 * - CRUD operations
 * - Authentication support
 * - Role updates
 * - Login tracking
 *
 * All queries use PreparedStatement placeholders (?) for security.
 */

public class UserSQL {

//Table  Creation

    public static final String CREATE_USER_TABLE =
        "CREATE TABLE IF NOT EXISTS users (" +
        "user_id INT PRIMARY KEY AUTO_INCREMENT, " +
        "username VARCHAR(50) NOT NULL UNIQUE, " +
        "password VARCHAR(255) NOT NULL, " +   // Stored as hashed password
        "full_name VARCHAR(100) NOT NULL, " +
        "email VARCHAR(100) NOT NULL UNIQUE, " +
        "role ENUM('Admin','Technician','Manager','Clerk') NOT NULL, " +
        "last_login TIMESTAMP NULL, " +
        "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP" +
        ");";


//Create (Insert)

    public static final String INSERT_USER =
        "INSERT INTO users (username, password, full_name, email, role) " +
        "VALUES (?, ?, ?, ?, ?);";

//Read (Select)

    // Get all users
    public static final String SELECT_ALL_USERS =
        "SELECT * FROM users;";

    // Get user by ID
    public static final String SELECT_USER_BY_ID =
        "SELECT * FROM users WHERE user_id = ?;";

    // Get user by username (used during login)
    public static final String SELECT_USER_BY_USERNAME =
        "SELECT * FROM users WHERE username = ?;";

    // Get user by email
    public static final String SELECT_USER_BY_EMAIL =
        "SELECT * FROM users WHERE email = ?;";


//Update

    // Update basic user info (Admin use)
    public static final String UPDATE_USER_INFO =
        "UPDATE users " +
        "SET full_name = ?, email = ?, role = ? " +
        "WHERE user_id = ?;";

    // Update password (after hashing)
    public static final String UPDATE_USER_PASSWORD =
        "UPDATE users " +
        "SET password = ? " +
        "WHERE user_id = ?;";

    // Update last login timestamp
    public static final String UPDATE_LAST_LOGIN =
        "UPDATE users " +
        "SET last_login = CURRENT_TIMESTAMP " +
        "WHERE user_id = ?;";

//Delete

    public static final String DELETE_USER =
        "DELETE FROM users WHERE user_id = ?;";

//Role-Based Access Support

    // Check user role (for access control validation)
    public static final String SELECT_USER_ROLE =
        "SELECT role FROM users WHERE user_id = ?;";

//Audit Support (Optional Future Use)

    // Count total users (for admin dashboard/reporting)
    public static final String COUNT_TOTAL_USERS =
        "SELECT COUNT(*) FROM users;";
}