/* It's hard to compare function to return the order of dates without the year, ex. 10/31 10AM vs 10/31 11AM.
 * Since the year is missing, construct a Date object with any dummy year to compare the order of the dates.
 */

module.exports = (a, b) => {
  am = parseInt(a.split(" ")[0].split("/")[0]);
  ad = parseInt(a.split(" ")[0].split("/")[1]);
  ah = parseInt(a.split(" ")[1].slice(0, -2));
  if (a.split(" ")[1].slice(-2) == "PM") {
    ah += 12;
  }
  bm = parseInt(b.split(" ")[0].split("/")[0]);
  bd = parseInt(b.split(" ")[0].split("/")[1]);
  bh = parseInt(b.split(" ")[1].slice(0, -2));
  if (b.split(" ")[1].slice(-2) == "PM") {
    bh += 12;
  }
  new Date(2021, am, ad, ah) < new Date(2021, bm, bd, bh);
};
