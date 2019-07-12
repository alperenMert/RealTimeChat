/**
 * MessageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: function(req, res){    

    res.view('pages/index');
  },
  chat: function(req, res){

      req.session.user = req.body.username;
      res.redirect('/chat');
  },
  chatPage: function(req, res){
    if(!req.session.user)
      res.redirect('/');

    console.log("Current session: ", req.session.user)

    res.view('pages/homepage', {user: req.session.user});
  },
  onConnect: function(req, res){
    console.log('username on connect: ', req.session.user);
    sails.sockets.join(req, 'chat-channel');
    return res.ok();
  },

  sendMessage: function(req,res){
    let content = req.body.content;
  
    sails.sockets.broadcast('chat-channel', 'chat', content);
    return res.ok();
  }
};
