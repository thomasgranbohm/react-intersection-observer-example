# Intersection Observer in React

> Simple lazy loading example with Intersection Observer and React.  

## Problem

The observers callback only seems to be able to access the original state, except when hot reload is turned on.

## Solution  

By adding the state as a dependency to the observer useEffect, the state used by the observer is always updated.  
This seems like a bad solution, and it is. But it is the only way I could get it to work.  
