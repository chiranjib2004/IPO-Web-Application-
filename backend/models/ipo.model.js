module.exports = (sequelize, DataTypes) => {
  return sequelize.define("IPO", {
    companyName: DataTypes.STRING,
    logoPath: DataTypes.STRING,
    priceBand: DataTypes.STRING,
    openDate: DataTypes.DATE,
    closeDate: DataTypes.DATE,
    issueSize: DataTypes.STRING,
    issueType: DataTypes.STRING,
    listingDate: DataTypes.DATE,
    status: DataTypes.STRING,
    ipoPrice: DataTypes.FLOAT,
    listingPrice: DataTypes.FLOAT,
    currentMarketPrice: DataTypes.FLOAT,
    rhpPdfPath: DataTypes.STRING,
    drhpPdfPath: DataTypes.STRING,
  });
};
