export const simulateNetwork = async (failureRate = 0.1, latency = 400) => {
  await new Promise((res) => setTimeout(res, latency));

  if (Math.random() < failureRate) {
    throw new Error("Network Error");
  }
};
