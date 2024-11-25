describe("Registration flow ", () => {
  it("should navigate to the about page", async () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

   
    // Find a link with an href attribute containing "Registration" and click it
    cy.get(".flex.space-x-4 > :nth-child(2)").click();

    // Check if the registration form is present
    cy.get("form").should("be.visible");

    // Try submitting the form without filling in the fields to test validation errors
    cy.get("button[type='submit']").click();
    cy.contains("Name is required").should("be.visible");
    cy.contains("Email is required").should("be.visible");
    cy.contains("Password is required").should("be.visible");
    cy.contains("Confirm Password is required").should("be.visible");

    // Fill in valid data
    const userData = {
      name: "Test User",
      email: `testuser${Date.now()}@example.com`, // Ensure a unique email for testing
      password: "password123",
      confirmPassword: "password123",
    };


    // Fill in valid data
    cy.get('input[name="name"]').type(userData.name);
    cy.get('input[name="email"]').type(userData.email);
    cy.get('input[name="password"]').type(userData.password);
    cy.get('input[name="confirmPassword"]').type(userData.password);

    // Submit the form
    cy.get("button[type='submit']").click();

    // // Mock server response and verify success behavior
    // await registerUser(userData);

    // Wait for the request to complete and check for navigation
    cy.wait("@registerRequest").then(() => {
      // Assert successful navigation to home page
      cy.url().should("eq", "http://localhost:3000/");
    });
  });
});
