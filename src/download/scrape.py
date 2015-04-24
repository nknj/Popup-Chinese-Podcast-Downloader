import urllib

# Get IDs
ids = [line.strip() for line in open('downloads/ids.txt')]

# Download
for id in ids:
    print 'Downloading ' + id
    urllib.urlretrieve ('http://popupchinese.com/data/' + id + '/audio.mp3', 'downloads/' + id + '.mp3')
