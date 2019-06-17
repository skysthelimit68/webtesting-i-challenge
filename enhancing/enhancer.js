module.exports = {
  succeed,
  fail,
  repair,
  get,
  preventOutOfBound
};

function succeed(item) {
  const max = 20
  const newItem = preventOutOfBound(item)
  const newEnhance = newItem.enhancement >= max ? max : newItem.enhancement + 1
  return {...newItem, enhancement : newEnhance}
}

// If the item's enhancement is less than 15, the durability of the item is decreased by 5.
// If the item's enhancement is 15 or more, the durability of the item is decreased by 10.
// If the item's enhancement level is greater than 16, the enhancement level decreases by 1 (17 goes down to 16, 18 goes down to 17).

function fail(item) {
  const min = 0;
  const newItem = preventOutOfBound(item);
  const newEnhance =  newItem.enhancement > 16 ? (newItem.enhancement-1) : newItem.enhancement;
  const newDura = newItem.enhancement < 15 ? (newItem.durability-5) : (newItem.durabiilty-10);
  
  return { ...newItem, enhancement : newEnhance, durability : Math.max(newDura, min)};
}

function repair(item) {
  const newItem = preventOutOfBound(item);
  return { ...newItem, durability : 100  };
}

function get(item) {
  const newItem = preventOutOfBound(item)
  const newName = newItem.enhancement > 0 ? `[+${newItem.enhancement}] ${newItem.name}` : newItem.name;
  console.log(newName);
  return { ...newItem, name : newName };
}

function preventOutOfBound(item) {

  const newEnhance = isNaN(item.enhancement) ? 0 : item.enhancement < 0 ? 0 : item.enhancement > 20 ? 20 : item.enhancement
  const newDura = isNaN(item.durability) ? 0 : item.durability < 0 ? 0 : item.durability > 100 ? 100 : item.durability
  return {...item, enhancement : newEnhance, durability : newDura};
}