function BoardControl(playerName, words) {
  this.name = playerName;
  this.type = "Board Control";
  this.words = words;
  this.size = null;
  this.properties = null;
  this.middleIndex = null;
  this.newPos = null;
  this.wordQueue = [];
  this.shuffled = false;
  this.messages = []
}

BoardControl.prototype.setProperties = function () {
  let setProperties = [];
  let splitWords = this.words.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  for (const [index, val] of splitWords.entries()) {
    setProperties.push(val.trim());
  }

  if (this.words.length === 1) {
     let splitWords = this.words.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
     for (const [index, val] of splitWords.entries()) {
       setProperties.push(val.trim());
     }

  }
  this.properties = setProperties;
  this.size = this.properties.length;
    for (const [i, word] of this.properties.entries()) {
      if (word === "" || word === "." || word === "/n") {
        this.properties.splice(i, 1);
      }
    }

  return this.properties;
};

BoardControl.prototype.shuffleWords = function () {
  let currentIndex = this.properties.length,
    randomIndex;
  

     while (currentIndex != 0) {
       randomIndex = Math.floor(Math.random() * currentIndex);
       currentIndex--;

       [this.properties[currentIndex], this.properties[randomIndex]] = [
         this.properties[randomIndex],
         this.properties[currentIndex],
       ];
     }
     return this.properties;

};

BoardControl.prototype.findMiddle = function () {
  this.setProperties();
  this.shuffleWords();

     const slicedProp = this.properties.slice(0, 24);
     const theMiddle = Math.floor(slicedProp.length / 2);
     const value = theMiddle;
     this.middleIndex = value;
     this.properties = slicedProp.splice(value, 0, "BINGO");
     return slicedProp;

};



export default BoardControl;
