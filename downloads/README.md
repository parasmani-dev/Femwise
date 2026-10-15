# APK hosting

The FemWise APK is about 350 MB, which is over GitHub's 100 MB per-file limit, so it is
**not stored in this repository**. It is hosted externally and the website's Download
button links straight to it. Either option below works.

## Option A: Google Drive

1. Upload `femwise.apk` to Google Drive.
2. Right-click it, choose **Share**, and set access to **Anyone with the link**.
3. Copy the share link. It looks like
   `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`.
4. Turn it into a direct-download link:
   `https://drive.google.com/uc?export=download&id=FILE_ID`
5. In `js/main.js`, paste that into `url`, set `hosted: true`, and update `size`. Commit and push.

Note: for files over 100 MB Drive shows a one-click "can't scan for viruses, download anyway"
page before the download starts. That is normal.

## Option B: GitHub Releases

1. Build the release APK from the Flutter app project (the folder containing `pubspec.yaml`):

   ```powershell
   flutter build apk --release --dart-define=ACCOUNT_API_URL=https://your-api-host
   ```

   The file lands at `build/app/outputs/flutter-apk/app-release.apk`.

2. On <https://github.com/parasmani-dev/Femwise/releases/new>:
   - Tag: `v1.0.0` (must match `APK.version` in `js/main.js`, prefixed with `v`)
   - Title: `FemWise 1.0.0`
   - Drag `app-release.apk` into the assets box and **rename it to `femwise.apk`** before publishing.

3. In `js/main.js`, set `url` to
   `https://github.com/parasmani-dev/Femwise/releases/download/v1.0.0/femwise.apk`,
   set `hosted: true`, and update `size`. Commit and push.

## New versions

Upload the new `femwise.apk` (new Drive file or new release tag), then update `version`,
`url` and `size` in `js/main.js`.

## Shrinking the APK

350 MB is unusually large for this app. Two changes typically cut it by more than half:

- Build per-ABI packages instead of one fat APK:
  `flutter build apk --release --split-per-abi` and publish the `arm64-v8a` one.
- Trim `assets/` in `pubspec.yaml`: it currently bundles the whole folder, including audio,
  GIFs and every image, rather than only what the app loads.
