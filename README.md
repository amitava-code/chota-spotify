# 🎵 Chota Spotify — Backend

> A mini Spotify-style backend. Artists drop tracks, listeners vibe. Built with Node.js, Express, MongoDB & JWT — no fluff, just clean auth and clean code.

---

## 🤔 What is this?

Ever wondered how Spotify knows who you are, keeps your playlists safe, and lets artists (not randoms) upload music? This project is a stripped-down version of that system — built from scratch to actually understand auth, file uploads, and relational data in MongoDB instead of just copy-pasting a tutorial.

Two roles run this whole show:
- 🎤 **Artists** — upload tracks, create albums
- 🎧 **Users** — browse music & albums

No mixed permissions, no chaos. Role-based access done properly.

---

## ⚡ Tech Stack

| Layer | Tech |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (JSON Web Tokens) + httpOnly cookies |
| Password Security | bcryptjs (salted hashing) |
| File Storage | ImageKit (audio file uploads) |
| File Handling | Multer (memory storage) |

---

## 🏗️ How it's structured

```
chota-spotify/
├── server.js          → entry point
├── src/
│   ├── controllers/   → business logic (auth, music, album)
│   ├── models/        → Mongoose schemas (user, music, album)
│   ├── middleware/    → route protection (authArtist, authUser)
│   ├── routes/        → API endpoints
│   └── services/      → third-party integrations (ImageKit upload)
├── package.json
└── .gitignore
```

Clean separation of concerns — no logic soup. Each layer does one job.

---

## 🔐 Auth Flow (the important part)

1. User registers → password gets hashed with **bcrypt** (never stored in plain text, obviously)
2. On login, a **JWT** is signed with the user's `id` and `role`, then dropped into an **httpOnly cookie**
3. Every protected route runs through middleware that:
   - Verifies the token
   - Checks the role (`artist` vs `user`)
   - Attaches `req.user` for controllers to use
4. Artists get exclusive access to upload/create endpoints. Users get read access. No cross-contamination.

---

## 📡 API Endpoints

### Auth
| Method | Route | Access |
|---|---|---|
| `POST` | `/register` | Public |
| `POST` | `/login` | Public |

### Music
| Method | Route | Access |
|---|---|---|
| `POST` | `/upload` | 🎤 Artist only |
| `GET` | `/` | 🔒 Logged-in (user or artist) |

### Albums
| Method | Route | Access |
|---|---|---|
| `POST` | `/album` | 🎤 Artist only |
| `GET` | `/albums` | 🔒 Logged-in (user or artist) |
| `GET` | `/albums/:albumId` | 🔒 Logged-in (user or artist) |

---

## 🎯 Cool Details Worth Knowing

- **Artists don't leak IDs to strangers** — populate calls are scoped so only relevant fields (`username`, `email`) are exposed, never raw sensitive data.
- **Ownership matters** — the `artist` field on every music/album doc is pulled straight from the verified JWT, not from user input. No spoofing someone else's identity.
- **Files go straight to the cloud** — audio uploads are converted to base64 in memory and shipped to ImageKit, no local disk storage clutter.
- **History matters too** — this repo's commit history is clean and intentional (yes, even fixed a wrong commit message via interactive rebase 😤).

---

## 🛠️ Setup (for the curious)

```bash
git clone https://github.com/amitava-code/chota-spotify.git
cd chota-spotify
npm install
```

Create a `.env` file:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

Run it:
```bash
npm start
```

---

## 🚧 Roadmap

- [ ] Refactor role-check middleware into a single reusable `authRole(...roles)` function
- [ ] Add input validation (Zod/Joi)
- [ ] Add JWT expiry + refresh token flow
- [ ] Deploy backend (Render) + connect frontend
- [ ] Add pagination to `/`, `/albums`

---

## 🙋 About this project

Built solo as a learning project to actually *understand* auth, MongoDB relationships, and file upload pipelines — not just follow along a video. Every bug fixed here (looking at you, whitespace-in-default-role bug 👀) was a real one.

If you're a recruiter reading this: yes, I write clean commits, yes I debug my own JWT issues at 1AM, and yes I know the difference between `_id` and `id` now. 😅

---

⭐ If you found this useful or interesting, a star on the repo means a lot.