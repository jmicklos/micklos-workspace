#!/bin/bash

# Define the base directory for your projects (adjust if needed)
PROJECTS_DIR="01 – Projects"  # Or wherever you store your projects

# Template file name
TEMPLATE_FILE="projects_template.md"

# Function to create a project file
create_project() {
  local PROJECT_NAME="$1"
  local FILENAME="${PROJECTS_DIR}/${PROJECT_NAME}.md"

  # Check if the template file exists
  if [ ! -f "$TEMPLATE_FILE" ]; then
    echo "Error: Template file '$TEMPLATE_FILE' not found."
    return 1
  fi

  # Create the project file from the template
  cp "$TEMPLATE_FILE" "$FILENAME"

  # Replace placeholders in the new file (if any - adjust as needed)
  sed -i "s/{{PROJECT_NAME}}/$PROJECT_NAME/g" "$FILENAME" # Example placeholder replacement. Remove if not used.


  echo "Created project: $FILENAME"
}


# Create the projects
create_project "Wedding – Florist"
create_project "Wedding – Hotel Blocks"
create_project "Wedding – (Our) Lodging"
create_project "Wedding – Color Palette"
create_project "Wedding – Program"
create_project "Wedding – Coordinator"
create_project "Wedding – Singapore Venue and Date"

echo "Project creation complete."
