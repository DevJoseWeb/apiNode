const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');//paginação
const bcrypt = require('bcryptjs');

const PessoasSchema = new mongoose.Schema({
 nome: {
    type: String,
    require: true,
  },
  cpf: {
    type: String,
    require: true,
  },
  //*****************************************USUARIO */
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
},
{
  usePushEach: true
},
);


PessoasSchema.plugin(mongoosePaginate);

const Pessoas = mongoose.model('Pessoas', PessoasSchema);
module.exports = Pessoas;

