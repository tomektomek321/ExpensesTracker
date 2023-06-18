export function makeRandomID(): string {
  const values = [1,2,3,4,5,6,7,8,9,0, 'a', 'b', 'd', 'e', 'g'];
  let newId = "";
  for(let i = 0; i < 8; i++) {
    const random = Math.floor(Math.random() * (values.length - 1));
    newId += values[random];
  }
  return newId;
}

export function createGuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return (
    s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4()
  );
}