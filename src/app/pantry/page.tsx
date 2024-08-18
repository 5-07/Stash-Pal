'use client';

import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, deleteDoc, doc, updateDoc } from '@firebase/firestore';
import { Box, Typography, Stack, TextField, IconButton, List, ListItem, ListItemText, ButtonGroup, Button, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { db } from '../firebase'; // Adjust import according to your setup

import { InputAdornment } from '@mui/material'; 
import SearchIcon from '@mui/icons-material/Search';
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";

interface Item {
  id: string;
  name: string;
  quantity: number;
  expiryDate?: string | null;
}

interface Recipe {
  title: string;
  description: string;
}

export default function Home() {
  // Inventory management state
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

   // Recipe generation state
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');

  // Add item to database
  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.trim() !== '') {
      await addDoc(collection(db, 'items'), {
        name: newItem.trim(),
        quantity: 1,
        expiryDate: expiryDate || null, 
      });
      setNewItem('');
      setExpiryDate('');
    }
  };

  // Read items
  useEffect(() => {
    const q = query(collection(db, 'items'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const itemsArr: Item[] = [];
      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id } as Item);
      });
      setItems(itemsArr);
    });

    return () => unsubscribe();
  }, []);

  // Delete item
  const deleteItem = async (id: string) => {
    await deleteDoc(doc(db, 'items', id));
  };

  // Increase quantity
  const increaseQuantity = async (id: string, currentQuantity: number) => {
    const itemRef = doc(db, 'items', id);
    await updateDoc(itemRef, {
      quantity: currentQuantity + 1,
    });
  };

  // Decrease quantity
  const decreaseQuantity = async (id: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      const itemRef = doc(db, 'items', id);
      await updateDoc(itemRef, {
        quantity: currentQuantity - 1,
      });
    }
  };

  // Filter items based on search query
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <>
    <Header /> 
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={4} 
    >
   
      {/* Main Content */}
      <Box
        width="100%"
        maxWidth="1200px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        
      >
        {/* Inventory Management */}
        <Box
          width="100%"
          p={4}
          mb={4}
          borderRadius="16px"
          boxShadow="0 8px 16px rgba(0, 0, 0, 0.5)"
          sx={{
            background: 'linear-gradient(45deg,#fbcfe8,	#ddd6fe)',
            color: 'white',
            maxHeight: '500px',
            overflowY: 'auto',
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#312e81',
              borderRadius: '8px',
            },
          }}
        >
          <Typography variant="h2" component="h1" fontWeight="bold" fontSize="3rem" textAlign="center" mb={2}  text-gray-900 >
            <span className=" tracking-tighter text-transparent bg-clip-text bg-gradient-to-r to-violet-950 from-violet-500 text-center">Your Stash</span>
          </Typography>
          <Stack spacing={2} mb={2}>
            <form onSubmit={addItem} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <TextField
                label="Enter Item"
                variant="outlined"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                fullWidth
                InputProps={{ style: { borderRadius: 8, fontSize: '1.1rem' } }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Enter Expiry Date"
                variant="outlined"
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                InputProps={{ style: { borderRadius: 8, fontSize: '1.1rem' } }}
                InputLabelProps={{ shrink: true }}
                sx={{ width: '180px' }}
              />
              <IconButton
                onClick={addItem}
                color="primary"
                sx={{ bgcolor: '#2e1065', '&:hover': { bgcolor: '#8b5cf6' }, color: 'white' }}
              >
                <AddIcon />
              </IconButton>
            </form>
            <TextField
              label="Search Items"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
              InputProps={{
                style: { borderRadius: 8, fontSize: '1.1rem' },
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
          <List>
            {filteredItems.map((item) => (
              <ListItem
                key={item.id}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => deleteItem(item.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                }
                sx={{ bgcolor: '#301934', color: 'white', borderRadius: '8px', marginBottom: '10px' }}
              >
                <ListItemText primary={item.name} />
                <ButtonGroup variant="contained" sx={{ bgcolor: '#2e1065', borderRadius: '8px' }}>
                  <Button
                    onClick={() => decreaseQuantity(item.id, item.quantity)}
                    sx={{ color: 'white', minWidth: '40px', '&:hover': { bgcolor: '#2e1065' } }}
                  >
                    <RemoveIcon />
                  </Button>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      bgcolor: 'white',
                      color: '#301934',
                      borderRadius: '0px',
                    }}
                  >
                    {item.quantity}
                  </Box>
                  <Button
                    onClick={() => increaseQuantity(item.id, item.quantity)}
                    sx={{ color: 'white', minWidth: '40px', '&:hover': { bgcolor: '#2e1065' } }}
                  >
                    <AddIcon />
                  </Button>
                </ButtonGroup>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Recipe Generation */}
        <Box
          width="100%"
          p={4}
          borderRadius="16px"
          boxShadow="0 8px 16px rgba(0, 0, 0, 0.1)"
          sx={{
            background: 'backdrop-blur',
            color: 'white',
            maxHeight: '500px',
            overflowY: 'auto',
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#301934',
              borderRadius: '8px',
            },
          }}
        >
          <Typography variant="h2" component="h1" fontWeight="bold" fontSize="3rem" textAlign="center" mb={2} >
            <span className=" tracking-tighter text-transparent bg-clip-text bg-gradient-to-r to-violet-950 from-violet-500 text-center">Recipe Suggestions</span>  
          </Typography>
      
          <form style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <TextField
              label="Under Development"
              variant="outlined"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              fullWidth
              InputProps={{ style: { borderRadius: 8, fontSize: '1.1rem' } }}
              InputLabelProps={{ shrink: true }}
            />
            <IconButton
              type="submit"
              color="primary"
              sx={{ bgcolor: '#2e1065', color: 'white' }}
            >
              <AddIcon />
            </IconButton>
          </form>
          {isLoading ? (
            <CircularProgress sx={{ marginTop: 2, color: '#301934' }} />
          ) : (
            <Stack spacing={2} mt={2}>
              {recipes.map((recipe, index) => (
                <Box
                  key={index}
                  p={2}
                  borderRadius="8px"
                  sx={{ background: '#fff', color: '#301934', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                >
                  <Typography variant="h6" component="h2" fontWeight="bold"> 
                  </Typography>
                  <Typography variant="body2"></Typography>
                </Box>
              ))}
            </Stack>
          )}
        </Box>
      </Box>
    </Box>
    <Footer />
    </>
  );
}

