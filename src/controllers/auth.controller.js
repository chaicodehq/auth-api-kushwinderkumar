import { User } from '../models/user.model.js';
import { signToken } from '../utils/jwt.js';

/**
 * Register a new user
 */
export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const existing = await User.findOne({ email: email?.toLowerCase() });
    if (existing) {
      return res.status(409).json({ error: { message: 'Email already exists' } });
    }

    // Create user (password hashed by pre-save hook)
    const user = await User.create({ name, email, password });

    return res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
}

/**
 * Login user and return JWT token
 */
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    // Find user including password field
    const user = await User.findOne({ email: email?.toLowerCase() }).select('+password');
    if (!user) {
      return res.status(401).json({ error: { message: 'Invalid credentials' } });
    }

    // Compare password
    const { default: bcrypt } = await import('bcryptjs');
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: { message: 'Invalid credentials' } });
    }

    // Generate token
    const token = signToken({ userId: user._id, email: user.email, role: user.role });

    // Return user without password
    const userObj = user.toObject();
    delete userObj.password;

    return res.status(200).json({ token, user: userObj });
  } catch (error) {
    next(error);
  }
}

/**
 * Get current authenticated user
 */
export async function me(req, res, next) {
  try {
    return res.status(200).json({ user: req.user });
  } catch (error) {
    next(error);
  }
}
