#!/bin/bash

# Number of times to run the test
ITERATIONS=75

# Loop counter
count=1

# Loop through the specified number of iterations
while [ $count -le $ITERATIONS ]
do
    echo "Running test iteration $count of $ITERATIONS"

    # Run the Cypress test
    npx cypress run --spec "cypress/e2e/google-form.cy.js"

    # Add a delay between iterations (e.g., 2 seconds)
    sleep 2

    # Increment counter
    ((count++))
done

echo "All test iterations completed!"
