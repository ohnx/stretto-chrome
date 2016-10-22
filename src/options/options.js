// Saves options to chrome.storage
function save_options() {
  var remoteUrl = document.getElementById('remote-url').value;
  var remoteName = document.getElementById('remote-name').value;
  if (!/^https?:\/\//i.test(remoteUrl)) {
    remoteUrl = 'http://' + remoteUrl;
    document.getElementById('remote-url').value = remoteUrl;
  }
  chrome.storage.sync.set({
    remoteUrl: remoteUrl,
    remoteName: remoteName
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    remoteUrl: 'https://example.com/',
    remoteName: null
  }, function(items) {
    document.getElementById('remote-url').value = items.remoteUrl;
    document.getElementById('remote-name').value = items.remoteName;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);