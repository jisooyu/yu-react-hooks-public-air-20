const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  // google authenticate 가 끝나면 /airdata 로 돌아감.
  app.get(
    '/auth/google/callback',
    passport.authenticate( 'google' ),
    ( req, res ) => {
      res.redirect('/airdata')
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    // res.send( req.user );
    res.redirect('/')
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
