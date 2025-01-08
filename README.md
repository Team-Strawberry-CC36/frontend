<a id="readme-top"></a>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#frontend-built-with">Frontend built with</a></li>
      </ul>
    </li>
    <li><a href="#current-features">Current Features</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<a href="[https://www.linkedin.com/in/lin-weichen/](https://jappuri.app/)">
  <img src="src/assets/Jappuri.png" alt="Jappuri Logo" width="300">
</a> <br>

Jappuri is a full stack web app that aims to teach tourists about proper etiquette customs when visiting Japan.
This is the repository for the frontend of the web app. For full functionality, use with the [backend](https://github.com/Team-Strawberry-CC36/backend) is required.

The project is deployed at [Jappuri.app](https://jappuri.app/).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Frontend built with

* [![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?logo=vuedotjs&logoColor=fff)](#)
* [![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)](#)
* [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](#)
* [![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)](#)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CURRENT FEATURES -->
## Current Features
* Login/Sign-up with both Firebase and backend authentication
* Search bar with location type filtering
* Interactable Google Maps component
* Place component showing photos, general information and etiquette rules
* Ability to share one's experiences
* Ability to give helpfulness ratings to experiences
* Ability to check, edit, and delete one's experiences via the user dashboard

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow the steps below.

### Prerequisites

Acquire the latest version of npm
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Team-Strawberry-CC36/frontend.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create and input your backend URL in a `.env`
   ```js
   VITE_BACKEND_URL='ENTER YOUR API';
   ```
4. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin Team-Strawberry-CC36/frontend
   git remote -v # confirm the changes
   ```
5. Run the project
```sh
npm run dev
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ROADMAP -->
## Roadmap

- [ ] Implement establishment owner features
- [ ] Reply feature to experiences
- [ ] Additional location types

See the [open issues](https://github.com/Team-Strawberry-CC36/frontend/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

If you have any suggestions that could improve this project, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Top contributors:

<a href="https://github.com/github_username/repo_name/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=github_username/repo_name" alt="contrib.rocks image" />
</a>
