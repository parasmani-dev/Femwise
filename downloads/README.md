# APK downloads

Put the release build here as **`femwise.apk`**. The download button on the site points at
`downloads/femwise.apk`, and the page checks that the file exists and shows its size automatically.

## Build the APK

From the Flutter app project folder (the one containing `pubspec.yaml`):

```powershell
flutter pub get
flutter build apk --release --dart-define=ACCOUNT_API_URL=https://your-api-host
```

The APK lands at `build/app/outputs/flutter-apk/app-release.apk`. Copy it here and rename it:

```powershell
Copy-Item build\app\outputs\flutter-apk\app-release.apk <this folder>\femwise.apk
```

Release builds need an HTTPS `ACCOUNT_API_URL`; debug builds allow plain HTTP.

## Publishing a new version

1. Replace `femwise.apk`.
2. Update `version` (and `minAndroid` if it changed) at the top of `js/main.js`.
3. Deploy the site.
