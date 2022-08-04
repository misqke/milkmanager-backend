const getcolor = (milkName) => {
  const name = milkName.toLowerCase();
  if (name.includes("homo") || name.includes("punch")) {
    return "#f00";
  } else if (name.includes("choc")) {
    return "#8b4513";
  } else if (
    name.includes("tea") ||
    name.includes("butter") ||
    name.includes("btr")
  ) {
    return "#4f4";
  } else if (name.includes("2%") || name.includes("blu")) {
    return "#22f";
  } else if (name.includes("rasp") || name.includes("pink")) {
    return "#ff1493";
  } else if (name.includes("1%") || name.includes("lemon")) {
    return "#ff0";
  } else if (name.includes("fat")) {
    return "#9370eb";
  } else if (name.includes("or")) {
    return "#f90";
  } else if (name.includes("grape")) {
    return "#9400d3";
  } else {
    return "#fff";
  }
};

module.exports = { getcolor };
