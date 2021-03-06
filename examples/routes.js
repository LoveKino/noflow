import flow from "../src";
import path from "path";
import kit from "nokit";
let { match, select } = kit.require("proxy");

let app = flow();

app.push(
    select({ url: "/test" }, $ => $.body = $.url),

    select(
        // Express.js like url selector.
        { url: match("/items/:id") },
        $ => $.body = $.url.id
    ),

    select(
        {
            url: "/api",
            method: /GET|POST/ // route both GET and POST
        },
        $ => $.body = $.method + " " + $.url
    ),

    select(
        // route js only
        { url: url => path.extname(url) === ".js" ? "js" : null },
        $ => $.body = $.url
    ),

    select(
        {
            // route some special headers
            headers: {
                host: "a.com"
            }
        },
        $ => $.body = "ok"
    )
);

app.listen(8123);
