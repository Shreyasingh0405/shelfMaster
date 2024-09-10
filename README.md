User Schema
username: String - The unique username of the user.
mobileNo: String - The mobile number of the user.
password: String - The hashed password of the user.
email: String - The email address of the user.
status: Enum (e.g., Active, Inactive) - The status of the user's account.
role: Enum (e.g., Admin, User) - The role assigned to the user.
image: String - URL to the user's profile image (stored in AWS S3).
Book Schema
bookName: String - The name of the book.
authorName: String - The name of the author.
description: String - A detailed description of the book.
summary: String - A brief summary of the book.
coverPage: String - URL to the book cover image (stored in AWS S3).
status: Enum (e.g., Available, Unavailable) - The availability status of the book.
userId: String (foreign key) - The ID of the user who uploaded the book.
Functional Requirements
📚 User Management: Users can add, edit, and delete books they have uploaded.
👀 Visibility: All users can see all books.
🔍 Specific Book Details: Users can view specific book details using the bookId.
☁️ AWS S3 Integration: All documents and images (like book cover images, user profile images) are uploaded to AWS S3.
📊 User-Based Book Details: Users can view all books uploaded by a specific user (filtered by userId).
