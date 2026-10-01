# Project Showcase Assets Directory

This directory contains visual showcase assets (screenshots, high-resolution mockup cards, diagrams, icons) for portfolio projects displayed in the **Project Showcase** section.

## Directory Structure

```
public/assets/projects/
├── emotitag/
│   └── emoti-tag.png         # emotiTag software interface screenshot
├── bookgrid/
│   └── book-grid.png         # BookGrid reading platform screenshot
├── cgpa-calculator/
│   └── cgpa-calculator.png   # Academic performance tracker screenshot
└── README.md
```

## How to Add New Project Assets

1. Create a dedicated folder under `public/assets/projects/<project-name>/`.
2. Save your showcase image (PNG/WebP/JPEG).
3. Reference the image path in `src/components/ProjectPanel.jsx` under `projects[i].imageUrl` (e.g., `/assets/projects/<project-name>/<image-name>.png`).
4. Include `deployedLink` and `githubUrl` properties for every project to display direct live demo and source code action buttons.
