import * as v from "valibot";

export const loginSchema = v.object({
  email: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your email."),
    v.email("The email address is badly formatted.")
  ),
  password: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your password."),
    v.minLength(4, "Your password must have 4 characters or more."),
    v.maxLength(128, "Your password is too long.")
  )
});

export const registerSchema = v.pipe(
  v.object({
    email: v.pipe(
      v.string(),
      v.nonEmpty("Please enter your email."),
      v.email("The email address is badly formatted.")
    ),
    name: v.pipe(
      v.string(),
      v.nonEmpty("Please enter your username."),
      v.minLength(2, "Your name must have 2 characters or more."),
      v.maxLength(128, "Your name is too long.")
    ),
    password: v.pipe(
      v.string(),
      v.nonEmpty("Please enter your password."),
      v.minLength(4, "Your password must have 4 characters or more."),
      v.maxLength(128, "Your password is too long.")
    ),
    confirmPassword: v.string()
  }),
  v.forward(
    v.check(
      (value) => value.password === value.confirmPassword,
      "Passwords do not match."
    ),
    ["confirmPassword"]
  )
);

export const postSchema = v.object({
  title: v.pipe(
    v.string(),
    v.nonEmpty("Please enter a title."),
    v.minLength(2, "Your title must have 2 characters or more."),
    v.maxLength(128, "Your title is too long.")
  ),
  markdown: v.pipe(
    v.string(),
    v.nonEmpty("Please enter some content."),
    v.maxLength(10000, "Your content is too long.")
  )
});
