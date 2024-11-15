import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4, // Minimum 4 characters for name
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email is unique in the database
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Minimum 6 characters for password
  },
  phoneNumber: { type: String, match: /^[0-9]{10}$/ }, 
  address: String,
  passengers: [
    {
      designation: { type: String, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      dob: { type: Date, required: true },
      phone: { type: String, match: /^[0-9]{10}$/ }, // Ensures 10-digit phone number
    },
  ],
  // Array of booking IDs referencing the Bookings collection
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
});

// Booking Schema definition
const BookingSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Reference to the User who made the booking
    required: true,
  },
  from: { type: String, required: true },
  to: { type: String, required: true },
  date: { type: Date, required: true },
  class: { type: String, required: true },
  passengers: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Confirmed', 'Cancelled'], 
    default: 'Pending',
  },
  price: { type: Number, required: true }, // Changed to Number
});

// Models
 const UserModel = mongoose.model('users', UserSchema);
 const BookingModel = mongoose.model('bookings', BookingSchema);

export  { UserModel, BookingModel };
