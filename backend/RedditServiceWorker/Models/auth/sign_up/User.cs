using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RedditServiceWorker.Models.auth.sign_up
{
    using System.ComponentModel.DataAnnotations;
    using System.IO;
    using System.Net.Http;

    /// <summary>
    /// Represents a user object with various properties.
    /// </summary>
    public class User
    {
        /// <summary>
        /// The first name of the user.
        /// </summary>
        [Required(ErrorMessage = "First name is required")]
        public string FirstName { get; set; }

        /// <summary>
        /// The last name of the user.
        /// </summary>
        [Required(ErrorMessage = "Last name is required")]
        public string LastName { get; set; }

        /// <summary>
        /// The address of the user.
        /// </summary>
        [Required(ErrorMessage = "Address is required")]
        public string Address { get; set; }

        /// <summary>
        /// The city of the user.
        /// </summary>
        [Required(ErrorMessage = "City is required")]
        public string City { get; set; }

        /// <summary>
        /// The country of the user.
        /// </summary>
        [Required(ErrorMessage = "Country is required")]
        public string Country { get; set; }

        /// <summary>
        /// The phone number of the user.
        /// </summary>
        [Required(ErrorMessage = "Phone number is required")]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Invalid phone number")]
        public string Phone { get; set; }

        /// <summary>
        /// The email address of the user.
        /// </summary>
        [Required(ErrorMessage = "Email address is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string Email { get; set; }

        /// <summary>
        /// The password of the user.
        /// </summary>
        [Required(ErrorMessage = "Password is required")]
        [MinLength(6, ErrorMessage = "Password must be at least 6 characters long")]
        public string Password { get; set; }

        /// <summary>
        /// The user profile image.
        /// </summary>
        [Required(ErrorMessage = "Profile picture is required")]
        public string ImageBlogUrl { get; set; }

        public User(MultipartFormDataStreamProvider provider)
        {
            FirstName = provider.FormData["firstName"];
            LastName = provider.FormData["lastName"];
            Address = provider.FormData["address"];
            City = provider.FormData["city"];
            Country = provider.FormData["country"];
            Phone = provider.FormData["phone"];
            Email = provider.FormData["email"];
            Password = provider.FormData["password"];
        }
    }
}