import requests
import sys
from datetime import datetime
import json

class AutoServiceAPITester:
    def __init__(self, base_url="https://carfix-vsev.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    print(f"   Response: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")
                self.failed_tests.append({
                    'name': name,
                    'expected': expected_status,
                    'actual': response.status_code,
                    'response': response.text[:200]
                })

            return success, response.json() if success and response.text else {}

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timeout")
            self.failed_tests.append({'name': name, 'error': 'Timeout'})
            return False, {}
        except requests.exceptions.ConnectionError:
            print(f"❌ Failed - Connection error")
            self.failed_tests.append({'name': name, 'error': 'Connection error'})
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({'name': name, 'error': str(e)})
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test(
            "Root API Endpoint",
            "GET",
            "api/",
            200
        )

    def test_contact_form_submission(self):
        """Test contact form submission"""
        contact_data = {
            "name": "Тест Тестович",
            "phone": "+7 921 123 45 67",
            "message": "Тестовое сообщение для проверки формы обратной связи"
        }
        
        return self.run_test(
            "Contact Form Submission",
            "POST",
            "api/contact",
            200,
            data=contact_data
        )

    def test_contact_form_validation(self):
        """Test contact form validation with invalid data"""
        # Test with missing required fields
        invalid_data = {
            "name": "",  # Empty name
            "phone": "123",  # Too short phone
            "message": "Test message"
        }
        
        success, _ = self.run_test(
            "Contact Form Validation (Invalid Data)",
            "POST",
            "api/contact",
            422,  # Validation error expected
            data=invalid_data
        )
        return success

    def test_get_contacts(self):
        """Test getting contact requests (admin endpoint)"""
        return self.run_test(
            "Get Contact Requests",
            "GET",
            "api/contacts",
            200
        )

    def test_status_endpoints(self):
        """Test status check endpoints"""
        # Test creating status check
        status_data = {
            "client_name": "Test Client"
        }
        
        success1, response = self.run_test(
            "Create Status Check",
            "POST",
            "api/status",
            200,
            data=status_data
        )
        
        # Test getting status checks
        success2, _ = self.run_test(
            "Get Status Checks",
            "GET",
            "api/status",
            200
        )
        
        return success1 and success2

def main():
    print("🚗 Starting Auto Service API Tests...")
    print("=" * 50)
    
    # Setup
    tester = AutoServiceAPITester()
    
    # Run all tests
    print("\n📡 Testing API Connectivity...")
    tester.test_root_endpoint()
    
    print("\n📝 Testing Contact Form...")
    tester.test_contact_form_submission()
    tester.test_contact_form_validation()
    tester.test_get_contacts()
    
    print("\n🔍 Testing Status Endpoints...")
    tester.test_status_endpoints()
    
    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.failed_tests:
        print("\n❌ Failed Tests:")
        for test in tester.failed_tests:
            print(f"   - {test['name']}: {test.get('error', f\"Expected {test.get('expected')}, got {test.get('actual')}\")}")
    
    success_rate = (tester.tests_passed / tester.tests_run) * 100 if tester.tests_run > 0 else 0
    print(f"\n✅ Success Rate: {success_rate:.1f}%")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())