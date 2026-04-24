export const getAutomations = async () => {
  return [
    {
      id: "email",
      label: "Send Email",
      params: ["to", "subject"],
    },
    {
      id: "slack",
      label: "Send Slack",
      params: ["channel"],
    },
  ];
};