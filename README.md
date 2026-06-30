# CTRL+Print WIP V.0.01

## Currently working on

Page layout and protocol builder.

## What is CTRL+Print

CTRL+Print is a protocol writing app with custom protocols and easy to use interface for quick and painless protocols. After the wizard it exports directly to PDF via the browser's print API.

CTRL+Print works entirely from your browser using React State to store the data, a local backup is also saved in sessionStorage. No data leaves your browser.

## Why am I building CTRL+Print?

Having been on the writing side of these protocols I'm a bit tired of the long and confusing processes to write a simple testing protocol. I want the app to be as simple as possible while packing as many features as possible. With the export directly to PDF I can focus on the "Writing" part instead of the storage/handling of the documents.

## Who is CTRL+Print for?

CTRL+Print is for technicians working with fire and break-in alarms. When the full app is finished it will be able to be used by everyone, but until the Protocol builder is implemented it will mainly be focused on technicians.

## Main features / Upcoming features

I will update this list progressively.

- [x] Writing protocols and printing them to PDF.
- [x] Persistent user settings per device.
- [ ] Creating custom protocols.
- [ ] Cloudflare Access. Only authenticated users will have access to the app.
- [x] Local PIN/Password for extra protection.
- [ ] Backend implementation.

## Demo/Screenshots

Coming soon...

## Getting started

### Using the App

Open the link in any browser. Set user settings and go. Company logo can be imported in settings.

### Running locally

To run locally you need to download the files, open in terminal, install packages 'npm install' then run 'npm run dev' to start.

## Tech stack

CTRL+Print uses Vite with React + TailwindCSS for the frontend. It will be deployed to Cloudflare pages. 

Packages: 
-  Lucide-pdf
-  react-to-print

## Contributing

Not accepting contributions at this stage, but feel free to open an issue if you find bugs or have any suggestions.

## License

MIT
