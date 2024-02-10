const knex = require('./../db');

exports.userLogin = async (req, res) => {
    const { body } = req;
    const { email, password } = body;

    console.log('HERHEREREWRWREWRWEREWRWREWRWERW', email, password);

    Promise.resolve()
        .then(
            () => knex('users')
                .select('email')
                .select('firstName')
                .select('lastName')
                .select('userId')
                .where({ email })
        )
        .then((results) => {
            if (results.length === 0) {
                console.log('NO USER FOUND');
                res.json({ message: 'User not found' });
            } else {
                console.log('USER FOUND');
                const user = results[0];
                // const passwordMatch = bcrypt.compareSync(password, user.password);
                if (1 === 1 /* passwordMatch */) {
                    // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                    //     expiresIn: 86400, // expires in 24 hours
                    // });
                    res.json({
                        success: true,
                        message: 'User logged in successfully',
                        token: 'fdafds',
                        user,
                    });
                } else {
                    res.json({
                        success: false,
                        message: 'Incorrect credentials'
                    });
                }
            }
        });
};
