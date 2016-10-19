import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

let Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

let userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    username_lower: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true,
        default: false
    },
    joined: {
        type: Date,
        required: true,
        default: Date.now
    }
});

userSchema.pre('save', function(next) {
    let user = this;

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }

            user.password = hash;

            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword: string, done: any) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) {
            return done(err);
        } else {
            done(null, isMatch);
        }
    });
};

let User = mongoose.model('User', userSchema);

export { User };