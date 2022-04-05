// GESTION D'ERREURS A L'AUTHENTIFICATION DU  USER

// ERRORS PSEUDO  -  Pseudo déjà utilisé, Pseudo à caractère sensible, Pseudo trop court / trop long
// ERRORS EMAIL  -  email déjà utilisé, email invalide
// ERRORS POSSIBLES  -  MDP trop court / trop long 

module.exports.signUpErrors = (err) => {
    let errors = { pseudo: '', email: '', password: ''}

    if (err.message.includes('pseudo'))
        errors.pseudo = "Pseudo incorrect";

    if (err.message.includes('email'))
        errors.email = "Email invalide";

    if (err.message.includes('password'))
        errors.password = "mot de passe doit faire 8 caractères minimum";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('pseudo'))
        errors.pseudo = "Ce pseudo est déjà utilisé";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('email'))
        errors.email = "cet email est déjà enregistré";

    return errors
};