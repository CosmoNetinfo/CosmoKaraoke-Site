const latestReleaseUrl = 'https://api.github.com/repos/CosmoNetinfo/CosmoKaraoke/releases/latest';
const releasesPageUrl = 'https://github.com/CosmoNetinfo/CosmoKaraoke/releases/latest';

const releaseStatus = document.querySelector('#release-status-text');
const windowsButton = document.querySelector('#windows-download');
const windowsFile = document.querySelector('#windows-file');
const macButton = document.querySelector('#mac-download');
const macFile = document.querySelector('#mac-file');

function showPlatformAsset(button, metadata, asset, platform) {
  if (!asset) {
    button.href = releasesPageUrl;
    button.querySelector('span:first-child').textContent = 'Vedi i pacchetti';
    metadata.textContent = 'Pacchetto non trovato; apri la pagina delle release.';
    return false;
  }

  button.href = asset.browser_download_url;
  button.setAttribute('download', asset.name);
  button.setAttribute('aria-label', `Scarica ${asset.name} per ${platform}`);
  metadata.textContent = `${asset.name} · ${formatSize(asset.size)}`;
  return true;
}

function formatSize(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return 'dimensione non disponibile';
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}

async function loadLatestRelease() {
  try {
    const response = await fetch(latestReleaseUrl, {
      headers: { Accept: 'application/vnd.github+json' },
      cache: 'no-store',
    });
    if (!response.ok) throw new Error(`GitHub ha risposto ${response.status}`);

    const release = await response.json();
    const assets = Array.isArray(release.assets) ? release.assets : [];
    const windowsAsset = assets.find((asset) => /_x64-setup\.exe$/i.test(asset.name));
    const macAsset = assets.find((asset) => /universal\.dmg$/i.test(asset.name))
      ?? assets.find((asset) => asset.name.toLowerCase().endsWith('.dmg'));
    const version = release.tag_name || release.name || 'Ultima versione';
    const published = formatDate(release.published_at);

    document.querySelector('#release-title').textContent = `CosmoKaraoke ${version}`;
    document.querySelector('#release-date').textContent = published ? `Pubblicata il ${published}.` : 'Ultima versione disponibile.';
    document.querySelector('#release-notes').href = release.html_url || releasesPageUrl;

    const windowsReady = showPlatformAsset(windowsButton, windowsFile, windowsAsset, 'Windows');
    const macReady = showPlatformAsset(macButton, macFile, macAsset, 'macOS');
    releaseStatus.textContent = windowsReady && macReady
      ? `Versione ${version} · link di download aggiornati automaticamente`
      : `Versione ${version} · alcuni pacchetti non sono disponibili in questa release`;
    document.querySelector('.release-status').classList.add(windowsReady && macReady ? 'is-ready' : 'is-partial');
  } catch (error) {
    releaseStatus.textContent = 'Non riesco a leggere i pacchetti in questo momento. Puoi aprire la release ufficiale.';
    for (const [button, metadata] of [[windowsButton, windowsFile], [macButton, macFile]]) {
      button.href = releasesPageUrl;
      button.querySelector('span:first-child').textContent = 'Apri la release ufficiale';
      metadata.textContent = 'Seleziona il pacchetto del tuo sistema operativo nella pagina GitHub.';
    }
    document.querySelector('.release-status').classList.add('is-error');
  }
}

loadLatestRelease();
