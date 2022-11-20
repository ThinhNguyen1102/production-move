module.exports = (sequelize, DataTypes) => {
  const ProductLineWh = sequelize.define("productLineWh", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return ProductLineWh;
};
