module.exports = {
  routes: [
    {
      method: "DELETE",
      path: "/saved-quotes/remove/:uid",
      handler: "saved-quote.deleteByUid"
    },
    {
      method: "DELETE",
      path: "/saved-quotes/remove",
      handler: "saved-quote.deleteAll"
    },
    {
      method: "GET",
      path: "/saved-quotes/find/:uid",
      handler: "saved-quote.findByUid"
    },
    {
      method: "GET",
      path: "/saved-quotes/user",
      handler: "saved-quote.findUserSavedQuotes"
    }
  ]
}
