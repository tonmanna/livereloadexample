async function test(): Promise<void> {
  return new Promise((resolve) => {
    resolve();
  });
}

function hello(test: any) {
  console.log(
    `Hello from 1231123123211231231221123123123 tttttttt 123123123123${test?.test}`
  );
}

hello({ test: "TypeScript 123123123 234" });
