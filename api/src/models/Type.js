const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
sequelize.define('type', {
   
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      collate: 'utf8_general_ci'
   }
  }, { timestamps: false });

 
  
};