export const wait = (time: number) =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve(undefined);
    }, time)
  );
