// -- ================================
//   --2️⃣ USERS TABLE
// -- ================================
//   CREATE TABLE IF NOT EXISTS users(
//     user_id SERIAL PRIMARY KEY,
//     username VARCHAR(50) UNIQUE NOT NULL,
//     email VARCHAR(100) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     bio TEXT,
//     created_at TIMESTAMPTZ DEFAULT NOW()
//   );

// -- ================================
//   --3️⃣ CATEGORIES TABLE
// -- ================================
//   CREATE TABLE IF NOT EXISTS categories(
//     category_id SERIAL PRIMARY KEY,
//     name VARCHAR(50) UNIQUE NOT NULL,
//     description TEXT
//   );

// -- ================================
//   --4️⃣ POSTS TABLE
// -- ================================
//   CREATE TABLE IF NOT EXISTS posts(
//     post_id SERIAL PRIMARY KEY,
//     user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
//     category_id INT REFERENCES categories(category_id) ON DELETE SET NULL,
//     title VARCHAR(150) NOT NULL,
//     content TEXT NOT NULL,
//     image_url TEXT,
//     created_at TIMESTAMPTZ DEFAULT NOW(),
//     updated_at TIMESTAMPTZ DEFAULT NOW()
//   );

// -- ================================
//   --5️⃣ COMMENTS TABLE
// -- ================================
//   CREATE TABLE IF NOT EXISTS comments(
//     comment_id SERIAL PRIMARY KEY,
//     post_id INT NOT NULL REFERENCES posts(post_id) ON DELETE CASCADE,
//     user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
//     content TEXT NOT NULL,
//     created_at TIMESTAMPTZ DEFAULT NOW()
//   );

// -- ================================
//   --6️⃣ LIKES TABLE
// -- ================================
//   CREATE TABLE IF NOT EXISTS likes(
//     like_id SERIAL PRIMARY KEY,
//     post_id INT NOT NULL REFERENCES posts(post_id) ON DELETE CASCADE,
//     user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
//     created_at TIMESTAMPTZ DEFAULT NOW(),
//     UNIQUE(post_id, user_id)-- A user can like a post only once
//   );

// -- ================================
//   --7️⃣ TAGS + POST_TAGS
// -- ================================
//   CREATE TABLE IF NOT EXISTS tags(
//     tag_id SERIAL PRIMARY KEY,
//     name VARCHAR(50) UNIQUE NOT NULL
//   );

// CREATE TABLE IF NOT EXISTS post_tags(
//     post_id INT NOT NULL REFERENCES posts(post_id) ON DELETE CASCADE,
//     tag_id INT NOT NULL REFERENCES tags(tag_id) ON DELETE CASCADE,
//     PRIMARY KEY(post_id, tag_id)
//   );
