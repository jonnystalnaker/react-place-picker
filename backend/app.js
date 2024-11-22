import bodyParser from 'body-parser';
import express from 'express';
import fs from 'node:fs/promises';

const app = express();

app.use(express.static('images'));
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
	res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

// Utility to ensure unique places
function ensureUniquePlaces(places) {
	const seenIds = new Set();
	return places.filter(place => {
		if (seenIds.has(place.id)) {
			return false;
		}
		seenIds.add(place.id);
		return true;
	});
}

app.get('/places', async (req, res) => {
	try {
		const fileContent = await fs.readFile('./data/places.json');
		const userPlacesData = JSON.parse(fileContent);
		res.status(200).json({ places: userPlacesData });
	} catch (error) {
		console.error('Error fetching places:', error);
		res.status(500).json({ message: 'Failed to fetch places.' });
	}
});

app.get('/user-places', async (req, res) => {
	try {
		const fileContent = await fs.readFile('./data/user-places.json');
		const userPlaces = JSON.parse(fileContent);
		const uniquePlaces = ensureUniquePlaces(userPlaces);
		res.status(200).json({ places: uniquePlaces });
	} catch (error) {
		console.error('Error fetching user places:', error);
		res.status(500).json({ message: 'Failed to fetch user places.' });
	}
});

app.put('/user-places', async (req, res) => {
	try {
		const updatedPlaces = req.body.places;
		if (!Array.isArray(updatedPlaces)) {
			return res
				.status(400)
				.json({ message: 'Invalid data format. Expected an array of places.' });
		}
		const uniquePlaces = ensureUniquePlaces(updatedPlaces);
		await fs.writeFile('./data/user-places.json', JSON.stringify(uniquePlaces));

		res
			.status(200)
			.json({ message: 'User places updated!', places: uniquePlaces });
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Failed to update user places.', error: error.message });
	}
});

// 404
app.use((req, res, next) => {
	if (req.method === 'OPTIONS') {
		return next();
	}
	res.status(404).json({ message: '404 - Not Found' });
});

app.listen(3000);
