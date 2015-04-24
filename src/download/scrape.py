import sys
import urllib

# Get IDs
ids = [line.strip() for line in open('downloads/ids.txt')]

# Download
for id in ids:
    # using stderr as a hack so that grunt shell will show the prints
    sys.stderr.write('Downloading {}...\n'.format(id))
    urllib.urlretrieve(
        'http://popupchinese.com/data/{}/audio.mp3'.format(id),
        'downloads/{}.mp3'.format(id)
    )
