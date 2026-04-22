const mongoose = require('mongoose');
const User = require('./models/User');
const Complaint = require('./models/Complaint');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const seedData = async () => {
    try {
        if (!MONGO_URI) {
            throw new Error('MONGO_URI is not defined in .env');
        }

        await mongoose.connect(MONGO_URI);
        console.log('Seed: Connected to Database');

        // Clear existing data
        await User.deleteMany({});
        await Complaint.deleteMany({});

        // Create Users
        const password = await bcrypt.hash('password123', 10);
        const jasleenPassword = await bcrypt.hash('jasd1411', 10);
        
        const admin = new User({
            name: 'Prakash Sharma (Chief Admin)',
            email: 'admin@gov.in',
            password,
            role: 'admin'
        });

        const officer = new User({
            name: 'Officer Rajesh Kumar',
            email: 'officer@gov.in',
            password,
            role: 'officer',
            department: 'Water'
        });

        const citizen = new User({
            name: 'JASLEEN DHIMAAN',
            email: 'jasleend@email.com',
            password: jasleenPassword,
            role: 'citizen'
        });

        await admin.save();
        await officer.save();
        await citizen.save();

        console.log('Seed: Users Created');

        // Create Complaints
        const complaints = [
            {
                trackingId: `COMP-${uuidv4().substring(0, 8).toUpperCase()}`,
                citizen: citizen._id,
                title: 'Water pipe leakage in Sector 14',
                description: 'A major water main pipe has been leaking for the past 3 days, causing water wastage and flooding on the street.',
                category: 'Water',
                location: 'Sector 14, Near Park Lane',
                status: 'Pending'
            },
            {
                trackingId: `COMP-${uuidv4().substring(0, 8).toUpperCase()}`,
                citizen: citizen._id,
                title: 'Street light not working',
                description: 'All 5 street lights in our lane have been out for a week, making it unsafe to walk at night.',
                category: 'Electricity',
                location: 'Green Valley, Lane 4',
                status: 'In Progress',
                assignedTo: officer._id
            },
            {
                trackingId: `COMP-${uuidv4().substring(0, 8).toUpperCase()}`,
                citizen: citizen._id,
                title: 'Uncollected garbage in Ward 5',
                description: 'The garbage collection truck has not visited our ward for over 4 days. The bins are overflowing.',
                category: 'Sanitation',
                location: 'Ward 5, Market Area',
                status: 'Resolved',
                assignedTo: officer._id
            }
        ];

        await Complaint.insertMany(complaints);
        console.log('Seed: Complaints Created');

        console.log('✅ Seed Complete. You can now login with:');
        console.log('Admin: admin@gov.in / password123');
        console.log('Officer: officer@gov.in / password123');
        console.log('Citizen: jasleend@email.com / jasd1411');

        process.exit(0);
    } catch (err) {
        console.error('Seed Error:', err);
        process.exit(1);
    }
};

seedData();
