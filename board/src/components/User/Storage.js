export default function Storage() {
  const localSet = (token) => {
    localStorage.setItem("key_test", token);
  };
  const localGet = () => {
    return localStorage.getItem("key_test");
  };
  const localRemove = () => {
    localStorage.removeItem("key_test");
  };
  return {
    localSet,
    localGet,
    localRemove,
  };
}
