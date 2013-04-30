//creacion nuestra documento de Frameworks, en sql seria la tabla
var Frameworks = new Meteor.Collection("frameworks");

if (Meteor.isClient) { // detectamos si se trata del cliente
  Template.list.frameworks = function () { //traemos la lista de los frameworks
    return Frameworks.find({}, {sort : {score: -1, name: 1}});
  };

  //logica para agregar los Frameworks
  Template.addFramework.events({
    'click button' : function (e) {//cuando le damos click al boton
      var value = $('#f-name').val();
      e.preventDefault();
      if(value){
        if(Frameworks.find({ name : value }).count() === 0) {//si ya existe no lo agrega
          Frameworks.insert({ name : value, votes : 1});
        }else{
          alert('Framework ya ha sido agregado!');
        }
      }
    }
  });

  //logica para votar
  Template.framework.events({
    'click #add' :function() {
      // como estamos ejecutando el codigo para un framework en especifico tenemos
      // acceso a el mediante this._id
      Frameworks.update( { _id : this._id }, { $inc : { votes : 1 } } );
    },
    'click #del' :function() {
      var framework = Frameworks.findOne({}, { _id : this._id });
      if(framework.votes>0){
        Frameworks.update( { _id : this._id }, { $inc : { votes : -1 } } );
      } else {
        alert('No puede quitarle mas votos!');
      }
    }
  });

  //Logica mostrar ganador

  Template.winner.win = function() {
    var win = Frameworks.findOne({}, {sort :  {votes :-1}});
    return win;
  }
}