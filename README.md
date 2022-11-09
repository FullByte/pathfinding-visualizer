# Pathfinding Visualizer

![visualizer](assets/visualizer.gif)

I saw [Clement Mihailescu's](https://github.com/clementmihailescu/Pathfinding-Visualizer) pathing visualizer using plain JavaScript and CSS as well as other derivatives ([richwill28](https://github.com/richwill28/pathfinding-visualizer)) and decided to make one using Next.js, TypeScript and Tailwind. This project implements four pathfinding algorithms (Breadth-First Search, Depth-First Search, Dijkstra, and A-Star) and two maze generation algorithms (Binary Tree and Recursive Division). The deployed pathfinding visualizer can be found [here](https://pathfinding-visualizer-nu.vercel.app/).

## Technologies used

| Next.js | TypeScript | Tailwind |
| ------- | ---------- | -------- |

## How run the app locally

1. Clone this repository.

2. Navigate to the repo

3. This project enables users to create custom mazes and share them with URLs. If you want this functionality move onto step 4. If you're not interested in implementing these features run the following command and then skip to step 7:

```
git reset --hard b8a9cc3
```

4. Create a new Github OAuth application on Github

5. Create a new supabase project, enable Github OAuth, create a table `mazes` with the following columns:

```
id (int8) (primary key)
created_at (timestamptz)
name (text)
grid (text[])
created_by (foreign key on user id)
```

6. Create a `.env.local` file at the root of this repo and fill in the following variables:

```
NEXT_PUBLIC_DEV_URL=
NEXT_PUBLIC_PROD_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

7. Run `yarn`

8. Run `yarn dev`

9. Open a new browser window `http://localhost:3000`
