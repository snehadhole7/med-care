# 🧪 Testing Guide - Complete Validation Scenarios

## ✅ Setup Before Testing

### Prerequisites:
1. Backend running: `npm start` (in backend folder)
2. Frontend running: `python -m http.server 8000` (in frontend folder)
3. Both MongoDB and mock data available
4. Modern browser (Chrome, Firefox, Safari, Edge)

### Test Accounts Available:
```
ADMIN:
Email: admin@medcare.com
Pass:  admin123

USER:
Email: user@medcare.com
Pass:  user123

NEW USER (for testing):
Email: testuser@example.com
Pass:  Test@12345
```

---

## 🧪 TEST SUITE 1: REGISTRATION PAGE

### Test 1.1: Valid Registration with New Email
```
URL: http://localhost:8000/pages/register.html

Steps:
1. Name: "John Doe" 
2. Email: "john.doe@example.com" (MUST be new)
3. Password: "JohnDoe@123456"
4. Confirm: "JohnDoe@123456"
5. Check Terms & Conditions
6. Click Register

Expected Results:
✓ No error messages appear
✓ Email shows green checkmark
✓ Button shows loading spinner
✓ Redirects to dashboard.html
✓ Token stored in localStorage
✓ Success message shows

Real-time Validation:
✓ Name field: "At least 3 characters" hint visible
✓ Email field: Shows checkmark on blur
✓ Password field: Shows strength meter
✓ Confirm field: Shows match status
✓ Terms checkbox: Required to submit
```

---

### Test 1.2: Email Duplicate Detection
```
URL: http://localhost:8000/pages/register.html

Setup:
- Must have registered an account first
- Use email: testdup@example.com

Steps:
1. First registration with testdup@example.com
   - Should succeed ✓

2. Logout and go back to register
3. Try to register with SAME email: testdup@example.com
4. Blur the email field (click elsewhere)

Expected Results:
✗ Email field shows RED error: "This email is already registered"
✗ Button disabled or shows error alert
✓ User cannot submit form
✓ Clear message shown
✓ Suggest login page link

Testing Variations:
- Try with admin@medcare.com → Error
- Try with user@medcare.com → Error
- Try with mock-user@mock.com → May work or error (depends on mock data)
```

---

### Test 1.3: Password Strength Meter
```
URL: http://localhost:8000/pages/register.html

Test Weak Password:
1. Name: "Test User"
2. Email: "test@example.com"
3. Password field - Type: "pass"
   Expected: 🔴 Weak password

Test Fair Password:
1. Clear password field
2. Type: "Pass123"
   Expected: 🟡 Fair password

Test Strong Password:
1. Clear password field
2. Type: "Pass@123456"
   Expected: 🟢 Strong password
3. Type: "P@ssw0rdSecure"
   Expected: 🟢 Strong password

Strength Requirements:
🔴 Weak: < 8 chars OR missing complexity
🟡 Fair: 8+ chars OR good mix
🟢 Strong: 8+ chars AND uppercase AND number AND special char

Visual Feedback:
✓ Color changes in real-time
✓ Text updates as you type
✓ Emoji indicators show
✓ Helpful text visible
```

---

### Test 1.4: Password Match Validation
```
URL: http://localhost:8000/pages/register.html

Test Matching Passwords:
1. Password: "SecurePass123"
2. Confirm: "SecurePass123"
3. Blur confirm field
   Expected: No error message

Test Non-Matching Passwords:
1. Password: "SecurePass123"
2. Confirm: "DifferentPass"
3. Blur confirm field
   Expected: Red error "Passwords do not match"

Test Correcting Error:
1. Fix confirm to match
2. Error disappears
   Expected: Error message vanishes

Visual Feedback:
✓ Error shows immediately on mismatch
✓ Error hides when corrected
✓ Confirm field borders change color
✓ Clear message shown
```

---

### Test 1.5: Name Validation
```
URL: http://localhost:8000/pages/register.html

Test Too Short:
1. Name: "Jo" (2 chars)
2. Blur name field
   Expected: Error or highlight invalid

Test Valid:
1. Name: "John Doe" (8 chars)
2. Blur name field
   Expected: No error, field is valid

Test Edge Case:
1. Name: "J" (1 char)
   Expected: Invalid feedback

Requirement:
- Minimum 3 characters
- No special validation on characters
```

---

### Test 1.6: Terms & Conditions
```
URL: http://localhost:8000/pages/register.html

Test Without Checking:
1. Fill all fields validly
2. DON'T check Terms checkbox
3. Click Register
   Expected: Cannot submit, error message

Test With Checking:
1. Fill all fields validly
2. Check Terms checkbox
3. Click Register
   Expected: Form submits successfully

Requirement:
✓ Checkbox must be checked
✓ Checkbox is labeled
✓ Link to Terms exists (for future use)
```

---

### Test 1.7: Form Loading States
```
URL: http://localhost:8000/pages/register.html

Steps:
1. Fill all fields correctly
2. Click Register
3. Watch button immediately

Expected Results:
✓ Button becomes disabled
✓ Button text changes to: "Registering..."
✓ Spinner animation plays
✓ Button is grayed out
✓ After success: Redirects to dashboard
✓ After error: Button re-enables

Timing:
- Should take 1-2 seconds max
- Should show feedback during wait
- Should handle network delays
```

---

## 🧪 TEST SUITE 2: LOGIN PAGE

### Test 2.1: Valid Login with Correct Credentials
```
URL: http://localhost:8000/pages/login.html

Test Admin Login:
1. Email: admin@medcare.com
2. Password: admin123
3. Click Login

Expected Results:
✓ No error messages
✓ Loading spinner shows
✓ After 1-2 seconds redirects
✓ Redirects to: admin-dashboard.html
✓ Token in localStorage
✓ User data in localStorage

Test User Login:
1. Email: user@medcare.com
2. Password: user123
3. Click Login

Expected Results:
✓ No error messages
✓ Redirects to: dashboard.html
✓ Token stored
✓ User role = "user"
```

---

### Test 2.2: Invalid Email
```
URL: http://localhost:8000/pages/login.html

Test Invalid Email Format:
1. Email: "notanemail"
2. Password: "anything"
3. Click Login
   Expected: Either form validation or API error

Test Non-Existent Email:
1. Email: "nonexistent@fakeemail.com"
2. Password: "anything"
3. Click Login
   Expected: Error message "Invalid credentials"

Expected Error:
✗ "Invalid credentials" (generic for security)
✗ NOT "User not found" (info leak)
```

---

### Test 2.3: Invalid Password
```
URL: http://localhost:8000/pages/login.html

Test Wrong Password:
1. Email: admin@medcare.com
2. Password: "wrongpassword"
3. Click Login

Expected Results:
✗ Error message: "Invalid credentials"
✗ NOT specific "wrong password" (security)
✓ Clear error shown
✓ Form stays displayed
✓ Can retry
```

---

### Test 2.4: Remember Me Functionality
```
URL: http://localhost:8000/pages/login.html

Test Enable Remember Me:
1. Email: testuser@example.com
2. Password: anything
3. CHECK "Remember me"
4. Click Login
   Expected: Successful login redirects

5. After successful login, logout
6. Go back to login page
   Expected: Email field is pre-filled
   Expected: "Remember me" checkbox is checked

Test Disable Remember Me:
1. Clear email from field
2. UNCHECK "Remember me"
3. Go to dashboard
4. Go back to login
   Expected: Email field is EMPTY
   Expected: Checkbox is UNCHECKED

Browser Storage:
✓ Check localStorage for "rememberEmail"
✓ Should persist across browser close/reopen
```

---

### Test 2.5: Demo Credentials Display
```
URL: http://localhost:8000/pages/login.html

Visual Check:
✓ Info box appears at bottom
✓ Box is properly styled (blue background)
✓ Shows "Demo Credentials" heading
✓ Shows Admin email and password
✓ Shows User email and password
✓ Text is clear and readable

Box Content Should Show:
- Admin: admin@medcare.com / admin123
- User: user@medcare.com / user123

Functionality:
✓ Credentials are clickable (optional)
✓ Copy to clipboard works (if implemented)
✓ Box is always visible
✓ Not hidden on mobile
```

---

### Test 2.6: Role-Based Redirect
```
URL: http://localhost:8000/pages/login.html

Test Admin Login Redirect:
1. Email: admin@medcare.com
2. Password: admin123
3. Click Login

Expected: 
✓ Redirects to: admin-dashboard.html
✓ NOT to regular dashboard.html

Test User Login Redirect:
1. Email: user@medcare.com
2. Password: user123
3. Click Login

Expected:
✓ Redirects to: dashboard.html
✓ NOT to admin-dashboard.html

Code Logic:
- Check user.role from response
- If "admin" → Go to admin-dashboard.html
- If "user" → Go to dashboard.html
```

---

### Test 2.7: Loading States on Login
```
URL: http://localhost:8000/pages/login.html

Steps:
1. Fill valid credentials
2. Click Login
3. Watch button immediately

Expected:
✓ Button becomes disabled
✓ Button text changes: "Logging in..."
✓ Spinner animation shows
✓ Button is visually disabled
✓ After success: Redirects
✓ After error: Button re-enables for retry
```

---

## 🧪 TEST SUITE 3: CROSS-BROWSER TESTING

### Desktop Browsers:
- [ ] Google Chrome (latest)
- [ ] Mozilla Firefox (latest)
- [ ] Safari (if Mac available)
- [ ] Microsoft Edge (latest)

### Mobile Browsers:
- [ ] Chrome Mobile
- [ ] Safari Mobile (iOS)
- [ ] Firefox Mobile
- [ ] Samsung Internet

### Responsive Tests:
- [ ] Mobile (320px width) - Forms stack vertically
- [ ] Tablet (768px width) - Forms adapt
- [ ] Desktop (1920px width) - Forms centered
- [ ] Ultra-wide (2560px) - Forms have max-width

---

## 🧪 TEST SUITE 4: ERROR HANDLING

### Test 4.1: Network Errors
```
Simulate offline:
1. Start form submission
2. Disconnect network
3. Should show error message
4. Error should be clear
5. User can retry

Expected Error Message:
- "Network error, check connection"
- "Please try again"
```

### Test 4.2: Server Errors
```
Stop backend server, then:
1. Try to register
2. Should get error (server down)
3. Error message clear
4. User can retry when server is back
5. No confusion about what happened
```

### Test 4.3: Invalid API Response
```
(If applicable to setup)
1. API returns unexpected format
2. Should handle gracefully
3. Show user-friendly error
4. Don't crash the page
```

---

## 🧪 TEST SUITE 5: SECURITY TESTS

### Test 5.1: Password Hashing
```
Steps:
1. Register with password: "MyPassword123"
2. Check localStorage
3. Should NOT see password in plain text
4. Should see token instead

Expected:
✓ Password is HASHED on server
✓ Token is ENCRYPTED in localStorage
✓ Password never transmitted plain
✓ All secure
```

### Test 5.2: XSS Prevention
```
Steps:
1. Email field: "<script>alert('XSS')</script>"
2. Name field: "<img src=x onerror='alert(1)'>"
3. Try to register

Expected:
✓ JavaScript doesn't execute
✓ Treated as plain text
✓ Input sanitized
✓ No security vulnerability
```

### Test 5.3: CSRF Protection
```
Note: Should be verified with backend
Check:
✓ Token is unique per session
✓ Token rotates after login
✓ Old tokens don't work
✓ Same-site cookie policies
```

---

## 📊 TEST RESULT TRACKING

### Create a Test Log:
```
Date: ________
Tester: ________
Browser: ________
OS: ________

REGISTRATION TESTS:
[ ] Test 1.1 - Valid Registration: PASS/FAIL
[ ] Test 1.2 - Duplicate Email: PASS/FAIL
[ ] Test 1.3 - Password Strength: PASS/FAIL
[ ] Test 1.4 - Password Match: PASS/FAIL
[ ] Test 1.5 - Name Validation: PASS/FAIL
[ ] Test 1.6 - Terms Checkbox: PASS/FAIL
[ ] Test 1.7 - Loading States: PASS/FAIL

LOGIN TESTS:
[ ] Test 2.1 - Valid Login: PASS/FAIL
[ ] Test 2.2 - Invalid Email: PASS/FAIL
[ ] Test 2.3 - Invalid Password: PASS/FAIL
[ ] Test 2.4 - Remember Me: PASS/FAIL
[ ] Test 2.5 - Demo Credentials: PASS/FAIL
[ ] Test 2.6 - Role Redirect: PASS/FAIL
[ ] Test 2.7 - Loading States: PASS/FAIL

Notes: ____________________
Issues Found: ____________________
Recommendations: ____________________
```

---

## 🎯 Quick Test Checklist (5 minutes)

Run this quick check every time:
```
1. [ ] Register with new email - Success?
2. [ ] Try duplicate email - Error shown?
3. [ ] Password meter shows - All levels work?
4. [ ] Password match works - Real-time?
5. [ ] Login with valid creds - Redirects?
6. [ ] Login with wrong creds - Error?
7. [ ] Remember me - Saves email?
8. [ ] Admin login - Admin dashboard?
9. [ ] User login - User dashboard?
10. [ ] Forms responsive - Mobile OK?

All green? ✅ You're good!
Any red? 🔴 Check specific test.
```

---

## 🐛 Common Issues & Troubleshooting

### Issue: Email check returns error always
**Solution:** Check if backend is running on port 5000

### Issue: Remember me doesn't work
**Solution:** Check localStorage in DevTools (F12)

### Issue: Password meter doesn't appear
**Solution:** Ensure JavaScript is enabled, check console for errors

### Issue: Passwords don't redirect
**Solution:** Verify backend is returning user.role field

### Issue: Forms look broken on mobile
**Solution:** Check viewport meta tag in HTML, refresh page

### Issue: "CORS error" appears
**Solution:** Backend needs CORS enabled (should be there)

### Issue: Mock data not working
**Solution:** Check if MongoDB is running, backend should fallback

---

## ✅ Final Sign-Off

When all tests pass:
```
Date Tested: ____________
Tested By: ____________
Browser(s): ____________
All Tests Passing: [ ] YES [ ] NO

Approved for: [ ] QA [ ] Staging [ ] Production

Notes: ________________
________________
```

---

## 📞 Need Help?

**Test failing?** Check:
1. Is backend running? (http://localhost:5000/api/health)
2. Is frontend running? (http://localhost:8000)
3. Check browser console (F12) for errors
4. Check network tab for API calls
5. Check localStorage for tokens

**Found a bug?** Document:
1. What you did (steps)
2. What you expected
3. What actually happened
4. Browser and OS
5. Screenshot if possible

Good luck testing! 🚀
