const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
sequelize.define('Pokemon_types', {
   
    pokemonId: {
      type: DataTypes.INTEGER,
      allowNull: false
   },
   typeId: {
    type: DataTypes.INTEGER,
    allowNull: false
   }
  }, { timestamps: false });

  
};