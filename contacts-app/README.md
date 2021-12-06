# Remix

Welcome to this tutorial on Remix. We're going to build a small contact management app. This tutorial is designed to get familiar with various APIs and conventions of Remix.

> **This tutorial is written in TypeScript. If you are not familiar with TypeScript, you can remove all the TypeScript type definitions and rename all files from `tsx` to `jsx`, and everything will work**

## Setup

Remix requires Node version 14 or greater.

```sh
git clone git@github.com:Girish21/remix-contacts-demo.git
cd remix-contacts-demo/contacts-app
npm install
npm run dev
```

Remix runs on port 3000 by default. Once the development server is ready, you can visit the app on `http://localhost:3000`.

_If you face any issues with the `remix` package, check if the `postinstall` npm script has run_

## Important Files

Remix as four important files

- [`remix.config.js`](https://github.com/Girish21/remix-contacts-demo/blob/remix-intro-start/contacts-app/remix.config.js) we can specify build and dev configurations of the Remix compiler in this file. Read more at [Remix](https://remix.run/docs/en/v1/api/conventions#remixconfigjs)
- [`entry.server.{tsx|jsx}`](https://github.com/Girish21/remix-contacts-demo/blob/remix-intro-start/contacts-app/app/entry.server.tsx), Remix uses the default export of this module to generate the response (including HTTP Status, Headers) and the markup for the request
- [`entry.client.{tsx|jsx}`](https://github.com/Girish21/remix-contacts-demo/blob/remix-intro-start/contacts-app/app/entry.client.tsx), Remix uses this module as the entry point for the browser bundle
- [`root.{tsx|jsx}`](https://github.com/Girish21/remix-contacts-demo/blob/remix-intro-start/contacts-app/app/root.tsx) will wrap all the pages in the app, can be used to add links, meta, layouts globally throughout the app

## Tasks

### Task I

Let's spin up the dev server by running `npm run dev` it'll spin up a Remix app server on port 3000. Let's visit [localhost:300](http://localhost:3000) and check out the app.

> TIP: to change the server port `PORT=3001 npm run dev`

App has no styles applied and looks like plain HTML 😅.

Head over to [`root.{tsx|jsx}`](https://github.com/Girish21/remix-contacts-demo/blob/remix-intro-start/contacts-app/app/root.tsx), and let's start adding the "global" styles here. The root is the right place for adding any global elements that are common across the whole app.

But where do we add them? It is the `links` export of the route module.

`links` will add the links specified into the document when the "route" is active and remove the links when the route is inactive. But since `root` will always be active, the links added here will be included throughout the app and on all the pages.

Okay, now our app looks way better. Let's move on to the next task!

### Task II

When we visit the index route, we are presented with a banner and a link to the `users` section. Since that doesn't add much value to the app, can we redirect to the `users` page and skip the index route altogether?
Head over to [index.tsx](https://github.com/Girish21/remix-contacts-demo/blob/remix-intro-start/contacts-app/app/routes/index.tsx) and fix this behaviour.

### Note on Database

For the simplicity of the tutorial, we will be using an SQLite file system based data store. We will also be using [Prisma](https://www.prisma.io/) as our ORM (it is great, and pairs perfectly with Remix).

We already have a simple schema defined for our tutorial at [schema.prisma](https://github.com/Girish21/remix-contacts-demo/blob/remix-intro-start/contacts-app/prisma/schema.prisma).
For this tutorial, we are going to store the name and email and a unique id for all the records.

To initialise the database with the Prisma model and create necessary tables, we just have to run [`npx prisma migrate dev`](https://www.prisma.io/docs/concepts/components/prisma-migrate) from the terminal.

We have already have set up the connection to the DB using the Prisma Client [here](https://github.com/Girish21/remix-contacts-demo/blob/remix-intro-start/contacts-app/app/db.server.ts)

> By naming the file as `.server.{ts|js}` we make sure that the DB connection code is never bundled to the client, and the Remix compiler make sure of that.
>
> We're also reusing the Prisma connection in development because in development mode Remix purges the cache on every build and, we'll hit the maximum local connections limit in no time. This way of reusing the client helps us avoid that.

> Note: Knowledge of Prisma is not required for the tutorial

### Task III

We will be fixing the [`/users`](https://github.com/Girish21/remix-contacts-demo/blob/remix-intro-start/contacts-app/app/routes/users.tsx) route in this task

#### Attach the Styles for the `users` route

Let's attach the styles for the `/users` route.

#### Add the meta tags for the route

The `meta` export of the route module allows us to add meta tags to the document. Let's add the title and the description meta tags of the route.

#### Fetch Users Data from a DB

We will fetch the data required for the route in the `loader` function. The `loader` function will always run on the server and will be called before the route renders.

Let's fetch all the users in the loader using,

```js
const users = await prisma.user.findMany()
```

and return the fetched users.

> **The following part is specific to TypeScript. If you're following the tutorial with JavaScript, you can skip the next section to head over to the next part**

For Type Safety, _this is purely for development; Remix/TypeScript cannot do runtime type check on the data passed from the loader function to the route component and, we have to use a third-party library like [zod](https://www.npmjs.com/package/zod) to handle runtime type checks_, we can cast the data from the loader to a type

```tsx
const loaderData: LoaderData = {
  /* some data */
}

return loaderData
```

and in the component, we can pass the type as the generic argument of `useLoaderData` to get type safety

```tsx
export default function () {
  const loaderData = useLoaderData<LoaderData>()
}
```

#### Better way of handling no users found (404)

The most common way of handling 404 would be to send an empty response and have check's in the component to render different component trees according to the data returned. But there's a more elegant way of doing this in Remix. "Throw" an actual 404 response to the client, and render a different component according to the status returned, keeping the route layout component clean of unnecessary logic.

```js
// loader

if (users.length === 0) {
  throw json({message: 'No Users found'}, status: 404)
}
return users
```

CatchBoundary, an export of Route Module, catches responses thrown from the loader/action.

The starter code already has the CatchBoundary exported from the Route Module. Our task is to wire it up and render the appropriate component according to the HTTP Status of the Response thrown. We can access the thrown response using `useCatchData`.

We already have a `FourOhFour` component in the project, let's import that and pass the message props.

### Recap

From the first three tasks, we have looked at the basic project structure of a Remix Project, clone and set up the project.

We have also looked at some Remix Convention and APIs such as `links`, `meta`, `loader`, `CatchBoundary`.

Now, to the unique feature of Remix as a framework, Data Mutations!

### Task IV

Now that we have looked at how to fetch data from a DB or any external third party APIs from the loaders, handle errors, pass the data from the loader to the component, let us look at Data Mutations.

Since Remix is built on top of web fundamentals such as Request, Response, fetch API, HTTP Status, Headers, Remix takes a more fundamental approach to Data Mutations using HTML `form` and HTTP.

Let us look at how to build a `form` and how to handle data mutations and create a new User entry into our database. Follow the tutorial and let's build [`/users/new`](https://github.com/Girish21/remix-contacts-demo/blob/main/contacts-app/app/routes/users.new.tsx).

#### Build the form

> A recap about **HTML Form**
>
> HTML Form is a section of the document containing interactive elements for submitting information [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form). When we submit data through a form, it makes a "navigation" to the URL specified in the "action" attribute of the form.
>
> HTML Form understand two HTTP verbs, GET and POST. We can specify this using the "method" attribute in the form. GET request will send the form data as a query string, and a POST will send the [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) in the "Request" body.

Building a form is straightforward. Each field requires an `input` and a `label` associated with it.

```jsx
<>
  <label htmlFor='name'>Name</label>
  <input id='name' name='name' type='text' required />
</>
```

Let's understand what the attributes specified in the above code snippet means.

[`label`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) specifies the caption for an element. `htmlFor` (just `for` in HTML) associates the label to any other element in the document

[`input`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) is used to create interactive elements in the form to accept user data. An `input` requires a `name` attribute. The `name` attribute will be used to serialise the form data when submitting the form and will be used as the key to access the data at the server. The `id` attribute will be used to link a particular `input` with a `label` element in the document. The `required` attribute makes sure the field is not empty.

#### Lets Handle the data submitted through the form

All the non-GET requests will be handled by the `actions` export of the route module. We'll be writing our logic of verifying and creating a new record with the submitted data here.

We can fetch the `FormData` from the request object

```js
const formData = await request.formData()
```

We can then retrieve the data from `formData`

```js
const name = formData.get('name')
const email = formData.get('email')
const avatar = formData.get('avatar')
```

We can then do a basic validation of the data. If there are errors then we return the error from the action. When we return any data from action, we can access them in the component using `useActionData`.

```js
export const action = async () => {
  // ...
  const errors = {}
  if (!name) {
    errors.name = 'Name is required'
  }

  if (Object.keys(errors).length > 0) {
    return {errors}
  }
  // ...
}

export default function () {
  const actionData = useActionData()
  const errors = actionData?.errors

  return (
    <form method='post'>
      <label>
      Name:
      <input name='name' />
      {errors?.name ? <p>{errors?.name}</p> : null}
    </form>
  )
}
```

If there are no errors, we can then proceed to insert a new record in the database with the information submitted through the form.

```js
import invariant from 'tiny-invariant'

export const action = async () => {
  // ...
  invariant(typeof name === 'string')
  await prisma.user.create({ data: { email } })
  return redirect('/users')
}
```

> **Note on `invariant`**
>
> We're using [tiny-invariant](https://www.npmjs.com/package/tiny-invariant) for this project. Invariant asserts the value passed to a function is truthy. If it is falsy it will throw an Error. It also helps us to narrow the type if we are using TypeScript.

We then return a `redirect` to the `/users` page. When we return a redirect, it replaces the browser history stack with the current location. Redirects also prevent accidental resubmission of the form on click of the browser back button. It is recommended to `redirect` after successful form submission. Refer [resubmissions](https://remix.run/docs/en/v1/api/remix#notes-about-resubmissions) for more notes about form resubmissions.

When we redirect to `/users`, we should see a list of users.

Phew, that section was intense. But we have successfully handled mutations with a few lines of code. AND, we did not write a single line of code on the client for handling validations, submissions, refetch on mutations!

Let's move on to the next section, view and edit the user's data.

### Task V

Now that we can create records in the database successfully, let us work on fetching the users data and updating it.

#### A note on file structure

Remix uses the file structure of the `routes` directory to define the app routes.

Our current file structure is

```.
├── index.tsx
├── users
│   └── $user.tsx
├── users.new.tsx
└── users.tsx
```

Our route structure looks like

```jsx
<Routes>
  <Route file='root.tsx'>
    <Route path='users/new' file='routes/users.new.tsx' />
    <Route index file='routes/index.tsx' />
    <Route path='users' file='routes/users.tsx'>
      <Route path=':user' file='routes/users/$user.tsx' />
    </Route>
  </Route>
</Routes>
```

> TIP: run `npx remix routes` to generate the routes structure of the app

- We can see that `root.tsx` wraps all the routes, and is the prefetch place to include common `link`, `meta` tags and enforce global layouts.
- Let's look at the routes of `/users`, `/users/new`, `/users/:user` in detail
  - `~/routes/users.tsx` defines the route `/users`
  - `~/routes/users.new.tsx` defines the route `/users/new`. When we create a file with the names `.`(dot) separated, we add segments to the URL. Thus, `users.new` transforms to `/users/new`.
  - `~/routes/users/$user.tsx` defines the route `/users/:user`. But doesn’t this looks exactly like the route generated by naming the file as `users.$user.tsx`. Why did we nest the file under the `users` directory? When we nest the subroute inside a directory we create a `nested` route in Remix (we can also infer this from the Routes generated from the file system). This allows Remix to match a URL to multiple nested layouts.

Alright, let's get back to the tutorial.

#### Let's fetch the data for the selected user

When the user clicks on any of the list items in `/users`, we navigate to `/users/:user` (as we saw in the previous section about the Routes, `/users/:user` is a nested route on `/users`, and the file exist at `app/routes/users/$user.tsx`).

Remix converts file names starting with `$` as a route param, and we can access the route param in the `loader`/`action` function using `params`. The file name will be the name of the params since we have named the file as `$user`, the param will be named as `user` and, we can access it as `params.user`.

We can then query the database for the given user ID. If the user ID is not there, as we have seen earlier, throw a 404 response and if a user exists return the fetched data.

(we already have the component wired up, returning the data from the loader should get the route working)

#### Handle users not found

In the loader, we throw a response when a user is not found. As we have already seen, a response thrown will be caught by the CatchBoundary. Let's use the same `FourOhFour` component with a `variant='section'`.

#### Display the fetched data in an Editable Form

In the route component, we can access the user data using the `useLoaderData` hook from Remix. We require the same form that we built for creating a new user. To save time, I have gone ahead and wrapped the form as a component `UserForm` that accepts the initial values and errors from form submission, if any.

```tsx
export default function() {
  const {user} = useLoaderData()

  // ...

      <UserForm
        iconUrl={user.avatar}
        initialEmail={user.email}
        initialName={user.name}
        submitbuttonText='Update User'
      />

  // ...
}
```

#### SEO

Good meta tags are essential for good SEO. We are fetching the data for the selected user. It would be better if we can change the title of the page to the selected user's name. We can do that using the `meta` function. Remix also passes the fetched data from the loader to the meta function as a param and, we can destructure `data` from the params.

#### Handle data Updates

It is almost similar to what we did for creating new records. Instead of calling the `create` API of Prisma Client, we will be calling the update API.

Again, always to server-side validation on the data submitted and return the errors if any.

After successful updation of the record, return a `redirect` so that on-page refresh the browser does not accidentally submit another request to the server.

## Recap

Time for another recap. We have created our first Remix app.

We went through various Remix APIs and features, such as the Route Module API (meta, links, loader, action, _default_, CatchBoundary), Nested Route, Revalidation on Data Write.

Now open your networks tab (and `all` sub-tab) and refresh the page. Do you notice something is missing in the networks tab? Take another look if you didn’t find anything unusual there (hint: something important is missing).

Yes, JavaScript is missing! 🤯

Did we build a whole app without JavaScript? What kind of sorcery is this?

Sine Remix is built on top of web fundamentals such as `form`, `anchor`, HTTP Caching, HTTP Status and server-rendered. The browser has everything that is required for it to work without JavaScript.

Let's enable JavaScript and enhance the app experience!

## JavaScript

To enable client-side JavaScript, in [root.tsx](https://github.com/Girish21/remix-contacts-demo/blob/remix-intro-start/contacts-app/app/root.tsx) add `<Scripts />` component in the `Document` component above the `<LiveReload />` component.

```jsx
// ~/root.tsx
import { Scripts } from 'remix'

const Document = ({ children, title }) => {
  // ...

  ;<body>
    {children}
    <Scripts />
    {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
  </body>

  // ...
}
```

Try clicking through the application nothing should have changed, and all the interactions should work fine.

### Form Submission indicator

Let us upgrade `form` to [`Form`](https://remix.run/docs/en/v1/api/remix#form) from Remix on the form for creating a new user [`/users/new`](https://github.com/Girish21/remix-contacts-demo/blob/remix-intro-start/contacts-app/app/routes/users.new.tsx)

When we submit an HTML Form, the browser takes care of the loading state by showing a spinner in place of the favicon. But when we enable JavaScript and allow Remix to handle the form submission, the browser will no longer handle loading states. And, if there is a noticeable delay between the form submission and the response from the server, the users will have no feedback to know what is happening.

Remix has a handy hook for this, `useTransition`. We can listen to the form states through this hook and react by rendering the loading state or updating the UI optimistically.

When we submit a `Form`, the state of the transition will switch to `submitting` and using the state we can render a loading spinner or any other visual feedback to the users. Let's do that now.

We already have a `Loader` component, which will render a spinner. Inside the `submit` form button, check for the transition state and if it is in submitting state render the `Loader` component, else render just the text.

```jsx
export default function () {
  const transition = useTransition()

  return (
    // ...
    <Form method='POST'>
      // ...
      <button>
        {transition.state === 'submitting' ? (
          <Loader>{submitbuttonText}</Loader>
        ) : (
          <>{submitbuttonText}</>
        )}
      </button>
    </Form>
  )
}
```

Throttle the network to `slow 3G` and try creating a new User. We can now notice that a loader is rendered inside the button. If we try switching off JavaScript, nothing will break and, now the browser takes care of showing the loader state since Remix is not controlling the `form`.

> `UserForm` component has the loader already implemented and will work without any modification

### Optimistic UI

Let us work on some Optimistic UI. When we edit the user details, if the network speed is slow, there will be a considerable delay between submitting the form and the user's list getting updated with the latest details.

This is a great place to introduce Optimistic UI, and Remix makes this trivial to implement.

The `useTransition` hook also contains the `FormData` that was submitted. We can use this to optimistically update the user details.

In [`users.tsx`](https://github.com/Girish21/remix-contacts-demo/blob/remix-intro-start/contacts-app/app/routes/users.tsx), inside the map operation where we are looping through the list of users and rendering the list, we can listen to the updates on the transition hook.

```jsx
export default function () {
  const { user } = useLoaderData()
  const transition = useTransition()

  // ...

  {
    users.map((user) => {
      const optimisticCondition = transition.state === 'submitting'

      const formData = transition.submission?.formData // get the form data from transition object
      const optimisticName = optimisticCondition // if there is a transition, fetch the name from form data, or use the data from loader
        ? formData?.get('name')
        : name
      const optimisticEmail = optimisticCondition // fetch email from form data, or use the data from loader
        ? formData?.get('email')
        : email

      // ...
    })
  }

  // ...
}
```

This works but, there is a problem. When there is a submission in progress, we will update all the items in the list optimistically. This is not what we want, and we want to update the details of the item that got updated.

When we post the data through a form, the default behaviour is to post it to the current URL. We have designed the route for viewing and editing the user detail as `/users/:user`, and when we submit the data, the form will post with an `action` of `/users/:user`, and we can access this from the `useTransition` hook!

Let's modify the condition for the optimistic update to

```js
const optimisticCondition =
  transition.submission?.action === `/users/${id}` &&
  transition.state === 'submitting'
```

Since we have access to the `id` of the user detail and know the URL of the action, we can compare the `action` value with the constructed URL with the `id` and only update the item that requires an update.

> With the above optimistic update condition, you will notice a slight flicker with the optimistically updated UI when Remix refetches the data after mutation. That is due to the `loading` state.
>
> Transition hooks state flow is as follows: idle -> submitting -> loading -> idle
>
> Thus, we have to have the optimistic update around till the data is refetched.
>
> Update the optimistic condition as follows
>
> const optimisticCondition = transition.submission?.action === `/users/${id}` && (transition.state === 'submitting' || transition.state === 'loading')

Vola, we got a very elegant user experience without having to juggle between various states, not set up a global store, not having to set up a client-side "server state management" library. And all of this will still work with JavaScript disabled 🤯.

Alright, we have come to the end of this tutorial on Remix. Hopefully, this gave you a good idea about Remix and helped you get started with it and build awesome apps with it!

## Next steps

- Try adding authentication to the app
- Try to save the user details associated with a logged-in user
- Try to add delete (with Optimistic UI, of course)
- Try to deploy this to a cloud environment and shoot us your work. We are happy to take a look at your awesome work!
- Keep exploring, and share Remix with your friends and coworkers :)
- Come hang out with us in Remix [Discord](https://rmx.as/discord)

## References

- [Remix Docs](https://remix.run/docs/en/v1)
- [Remix conventions](https://remix.run/docs/en/v1/api/conventions)
- [Remix Package](https://remix.run/docs/en/v1/api/remix)
